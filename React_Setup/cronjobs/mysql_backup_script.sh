#################################################################################################################################
# IN ORDER FOR THIS TO WORK YOU NEED CHANGE THE /path/to/database/data_backup.sql PATHS TO THE CORRECT data_backup.sql LOCATION #
#################################################################################################################################

docker exec mysql1 /usr/bin/mysqldump -u root --password=secret base_db > /path/to/database/data_backup.sql

sed -i '1s/^/DROP user '\''root'\''@'\''%'\'';\nFLUSH PRIVILEGES;\nCREATE USER '\''root'\''@'\''%'\'' IDENTIFIED BY '\''secret'\'';\nGRANT ALL PRIVILEGES ON * . * TO '\''root'\''@'\''%'\'';\n\nCREATE SCHEMA `myapp` DEFAULT CHARACTER SET utf8;\n\nSET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";\nSET AUTOCOMMIT = 0;\nSTART TRANSACTION;\nSET time_zone = "+00:00";\n\nCREATE DATABASE IF NOT EXISTS `base_db` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;\nUSE `base_db`;\n\n/' /path/to/database/data_backup.sql
