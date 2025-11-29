import React, { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    title,
    size = 'md',
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className={`modal modal--${size}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal__header">
                    {title && <h3 className="modal__title">{title}</h3>}
                    <button className="modal__close" onClick={onClose} aria-label="Close modal">
                        <X size={24} />
                    </button>
                </div>
                <div className="modal__content">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
