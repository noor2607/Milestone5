var _a;
var form = document.getElementById('resumeForm');
var resumeDisplayElement = document.getElementById('resumeOutput');
var shareableLinkContainer = document.getElementById('shareableLink');
var shareableLinkElement = document.getElementById('shareableLinkElement');
var downloadPdfButton = document.getElementById('downloadpdf');
var copyLinkButton = document.getElementById('copyLinkButton');
(_a = document.getElementById("resumeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    var profilePicElement = document.getElementById("profile");
    var nameElement = document.getElementById("name").value;
    var emailElement = document.getElementById("email").value;
    var contactElement = document.getElementById("contact").value;
    var educationElement = document.getElementById("education").value;
    var skillsElement = document.getElementById("skills").value;
    var workElement = document.getElementById("work").value;
    var resumeData = { nameElement: nameElement, emailElement: emailElement, contactElement: contactElement, educationElement: educationElement, skillsElement: skillsElement, workElement: workElement };
    localStorage.setItem(nameElement, JSON.stringify(resumeData));
    var reader = new FileReader();
    reader.onload = function (e) {
        var _a;
        var profileImageHTML = "<img src=\"".concat((_a = e.target) === null || _a === void 0 ? void 0 : _a.result, "\" alt=\"Profile Picture\" class=\"profile\">");
        var resumeHTML = "\n      <h2>Editable Resume</h2>\n      <h3>Personal Information</h3>\n      ".concat(profileImageHTML, "\n      <p><b>Name:</b> <span contenteditable=\"true\">").concat(nameElement, "</span></p>\n      <p><b>Email:</b> <span contenteditable=\"true\">").concat(emailElement, "</span></p>\n      <p><b>Contact:</b> <span contenteditable=\"true\">").concat(contactElement, "</span></p>\n      <p><b>Education:</b> <span contenteditable=\"true\">").concat(educationElement, "</span></p>\n      <p><b>Skills:</b> <span contenteditable=\"true\">").concat(skillsElement, "</span></p>\n      <p><b>Experience:</b> <span contenteditable=\"true\">").concat(workElement, "</span></p>\n    ");
        resumeDisplayElement.innerHTML = resumeHTML;
        var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(nameElement));
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    };
    if ((_a = profilePicElement.files) === null || _a === void 0 ? void 0 : _a.length) {
        reader.readAsDataURL(profilePicElement.files[0]);
    }
});
downloadPdfButton.addEventListener('click', function () {
    window.print();
});
copyLinkButton.addEventListener('click', function () {
    var linkText = shareableLinkElement.href;
    navigator.clipboard.writeText(linkText).then(function () {
        alert('Link copied to clipboard!');
    });
});
window.addEventListener('DOMContentLoaded', function () {
    var urlparams = new URLSearchParams(window.location.search);
    var username = urlparams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('name').value = resumeData.nameElement;
            document.getElementById('email').value = resumeData.emailElement;
            document.getElementById('contact').value = resumeData.contactElement;
            document.getElementById('education').value = resumeData.educationElement;
            document.getElementById('skills').value = resumeData.skillsElement;
            document.getElementById('work').value = resumeData.workElement;
        }
    }
});
