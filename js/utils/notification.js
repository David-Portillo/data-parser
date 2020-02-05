export const showNotify = () => {
  let notify = document.querySelector('#notify');
  notify.removeAttribute('hidden');
  console.log(notify)
}

window.closeNotify = () => {
	let notify = document.querySelector('#notify');
	notify.setAttribute('hidden', '');
	console.log(notify);
};
