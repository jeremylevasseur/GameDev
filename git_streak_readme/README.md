# Add A Commit Streak To Your GitHub Profile
---
#### Step 1
---
Create a new repository and give it the same name as your username. Make sure the repository has it's visibility set to *Public* and choose to initialize it with a README file by checking the "Add a README file" box. Hit the "Create repository" button, which should bring you to the newly created repository.

---
#### Step 2
---
Once at the new repository page, click the clone drop down button and copy the HTTP url. Head to your terminal and navigate to wherever you want to store this repository. Then run the following command, but instead of the link shown, use the one you copied.
```
git clone https://github.com/jeremylevasseur/jeremylevasseur.git
```
You may need to authenticate yourself by either entering your credentials into the terminal prompt, or by entering them into a webpage that pops up in a browser. It depends on your operating system.

---
#### Step 3
---
The new repository should now be present in the directory you cloned it in. Navigate into it within the terminal. You should see a single file there named *README.md*. Open this file up with your text editor of choice and paste the following chunk in.

```
### Welcome to my GitHub profile

[![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=jeremylevasseur&theme=dark)]

This is where you can write about yourself, if you want.

<!--
This is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
```

---
#### Step 4
---
You now need to edit the URL within the GitHub Streak line of text. The GitHub username needs to be changed to yours.
```
[![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=<github-username>&theme=dark)]
```
So, in my case, the <github-username> would change to ```jeremylevasseur```.

---
#### Step 5
---
Now you need to add, commit, and push these changes to the repository. Go back to your terminal and make sure you are located within the repository root directory. The root directory is the one that contains the README.md file.

##### Small Git Trick
---
Whenever you make changes to a file within your local Git repository, they are kept track of. You can see which files have been modified by executing the following command within your repository's root directory.
```
git status
```
The terminal output should contain a list of all the files that you have modified.

---

First, you need to add your changes to the Git *queue*, which will be commited after the next command. To add your changes, execute the following command.
```
git add .
```

Now, you need to commit your changes to your local version of the repository by executing the following command.
```
git commit -m "Adding a commit streak counter to the README file."
```
The Git commit message should reflect the changes that were made.

Finally, you need to push these changes to the repository on GitHub. To do that, execute this final command.
```
git push
```

If you get an output from the terminal that contains something similar to the following two lines:
```
git config --global user.name "user.name"
git config --global user.email "user@example.com"
```
then you need to run these commands separately, but with your GitHub username and your GitHub email address. For example, I would need to execute the following two commands, one after the other.
```
git config --global user.name "jeremylevasseur"
git config --global user.email "jeremylevasseur@fakegmail.com"
```

Once that is done, try executing that push command again.
```
git push
```

Your README edits should have been pushed to the repository on GitHub, and you should now have a Git commit streak counter on your profile page.


