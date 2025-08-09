import {FC} from "react";

interface ModalProps {
    children: React.ReactNode;
    title: string;
    formId: string;
    onClose: () => void;
}

const Modal: FC<ModalProps> = ({children, title, formId, onClose}) => {
    return (
        <>
            <div className='modal show d-block' tabIndex={-1}>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>{title}</h5>
                            <button type='button' className='btn-close' onClick={onClose}></button>
                        </div>

                        <div className='modal-body'>
                            {children}
                        </div>
                        <div className='modal-footer'>
                            <button form={formId} type='submit' className='btn btn-outline-primary' >Создать продукт</button>
                            <button
                                type='button'
                                className='btn btn-secondary'
                                onClick={onClose}
                            >Отменить</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='modal-backdrop fade show'></div>
        </>
    )
}
export default Modal;