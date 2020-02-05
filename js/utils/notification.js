export const showNotify = (message = 'No message is set') => {
  let notify = document.querySelector('#notify');
  let notifyMsg = document.querySelector('#notify > p')

  notify.removeAttribute('hidden');
  notifyMsg.textContent = message
  
  console.log(notify)
  console.log(notifyMsg)
}

window.closeNotify = () => {
	let notify = document.querySelector('#notify');
	notify.setAttribute('hidden', '');
	console.log(notify);
};
