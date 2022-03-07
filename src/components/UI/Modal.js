import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const portalElement = document.getElementById('overlays');

const Modal = ({ children, onClose }) => {
	return (
		<>
			{ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay>{children}</ModalOverlay>,
				portalElement
			)}
		</>
	);
};

export default Modal;

export const Backdrop = ({ onClose }) => {
	return <div className={classes.backdrop} onClick={onClose} />;
};

export const ModalOverlay = ({ children }) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{children}</div>
		</div>
	);
};
