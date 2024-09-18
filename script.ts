const form = document.getElementById('resumeForm') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resumeOutput') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareableLink') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareableLinkElement') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('downloadpdf') as HTMLButtonElement;
const copyLinkButton = document.getElementById('copyLinkButton') as HTMLButtonElement;

document.getElementById("resumeForm")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const profilePicElement = document.getElementById("profile") as HTMLInputElement;
  const nameElement = (document.getElementById("name") as HTMLInputElement).value;
  const emailElement = (document.getElementById("email") as HTMLInputElement).value;
  const contactElement = (document.getElementById("contact") as HTMLInputElement).value;
  const educationElement = (document.getElementById("education") as HTMLTextAreaElement).value;
  const skillsElement = (document.getElementById("skills") as HTMLTextAreaElement).value;
  const workElement = (document.getElementById("work") as HTMLTextAreaElement).value;

  const resumeData = { nameElement, emailElement, contactElement, educationElement, skillsElement, workElement };
  localStorage.setItem(nameElement, JSON.stringify(resumeData));

  const reader = new FileReader();
  reader.onload = function (e) {
    const profileImageHTML = `<img src="${e.target?.result}" alt="Profile Picture" class="profile">`;

    const resumeHTML = `
      <h2>Editable Resume</h2>
      <h3>Personal Information</h3>
      ${profileImageHTML}
      <p><b>Name:</b> <span contenteditable="true">${nameElement}</span></p>
      <p><b>Email:</b> <span contenteditable="true">${emailElement}</span></p>
      <p><b>Contact:</b> <span contenteditable="true">${contactElement}</span></p>
      <p><b>Education:</b> <span contenteditable="true">${educationElement}</span></p>
      <p><b>Skills:</b> <span contenteditable="true">${skillsElement}</span></p>
      <p><b>Experience:</b> <span contenteditable="true">${workElement}</span></p>
    `;

    resumeDisplayElement.innerHTML = resumeHTML;

    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(nameElement)}`;
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
  };

  if (profilePicElement.files?.length) {
    reader.readAsDataURL(profilePicElement.files[0]);
  }
});

downloadPdfButton.addEventListener('click', () => {
  window.print();
});

copyLinkButton.addEventListener('click', () => {
  const linkText = shareableLinkElement.href;
  navigator.clipboard.writeText(linkText).then(() => {
    alert('Link copied to clipboard!');
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const urlparams = new URLSearchParams(window.location.search);
  const username = urlparams.get('username');
  if (username) {
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
      const resumeData = JSON.parse(savedResumeData);
      (document.getElementById('name') as HTMLInputElement).value = resumeData.nameElement;
      (document.getElementById('email') as HTMLInputElement).value = resumeData.emailElement;
      (document.getElementById('contact') as HTMLInputElement).value = resumeData.contactElement;
      (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.educationElement;
      (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skillsElement;
      (document.getElementById('work') as HTMLTextAreaElement).value = resumeData.workElement;
    }
  }
});
