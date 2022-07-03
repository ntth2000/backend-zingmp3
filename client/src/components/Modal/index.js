import { useCallback } from "react";
import usePortal from "react-cool-portal";
import Icon from "~/components/Icon";
import "./Modal.scss";

const useModal = (
  options = {},
  showCloseBtn = true,
  closeModalHandle = () => {}
) => {
  const { Portal, isShow, hide, ...rest } = usePortal({
    defaultShow: false,
    ...options,
  });

  const Modal = useCallback(
    ({ children }) => (
      <Portal>
        <div className="modal" id="modal" tabIndex={-1}>
          <div className="modal-overlay" onClick={hide}></div>
          <div className="modal-content">
            {showCloseBtn && (
              <div
                className="modal-close"
                onClick={() => {
                  closeModalHandle();
                  hide();
                }}
              >
                <Icon content="Đóng" placement="top" size={34} iconSize={24}>
                  <i className="ic-close"></i>
                </Icon>
              </div>
            )}
            {children}
          </div>
        </div>
      </Portal>
    ),
    [isShow]
  );

  return { Modal, hide, ...rest };
};

export default useModal;
