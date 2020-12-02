function generateName() {
    const vowels = ["a", "e", "i", "o", "u", "y", "å", "ä", "ö"];

    const setFeedbackContent = (text) => {
        document.getElementById("generatedName").innerHTML = text;
    };

    const nameParts = document.getElementById("myName").value.split(" ");

    if (nameParts.length < 1 || nameParts[0].length < 1) {
        setFeedbackContent("Pahoittelut, Sedunimeä ei voitu luoda");
        return;

    }
    const lastName = " De Luca";
    const text ="Sedunimesi on ";
    const firstName = nameParts[0].toLowerCase();

    if (vowels.includes("" + firstName.charAt(0))) {
        setFeedbackContent(text + "Z" + firstName + lastName);
    } else {
        setFeedbackContent(text + "Z" + firstName.substring(1) + lastName);
    }
}
