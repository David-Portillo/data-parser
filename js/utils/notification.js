export const showNotify = (message = 'No message is set') => {
  let notify = document.querySelector('#notify > div');
  let notifyMsg = document.querySelector('#notify > div > p')

  notify.removeAttribute('hidden');
  notifyMsg.textContent = message
}

window.closeNotify = () => {
	let notify = document.querySelector('#notify > div');
  notify.setAttribute('hidden', '');
};
