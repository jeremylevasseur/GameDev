// This file contains JavaScript for the index.html file


jQuery(document).ready(function ($) {

    console.log("This function runs when the document loads");

    getTheDamnTime();

});


function getTheDamnTime() {

    var current = new Date();

    console.log(current.toLocaleString());

}