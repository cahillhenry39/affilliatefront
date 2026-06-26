// import GeneralUpdate from "./GeneralUpdate";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import GeneralUpdate from "./GeneralUpdate";

function SettingsButtonTransaction({ nextKin }) {
  return (
    <>
      {!nextKin.nextKinFullName && (
        <Modal>
          <Modal.Open opens="nextKin">
            <Button type="primary">add next of kin</Button>
          </Modal.Open>

          <Modal.Window name="nextKin">
            <GeneralUpdate type="nextKin" onCloseModal />
          </Modal.Window>
        </Modal>
      )}

      <Modal>
        <Modal.Open opens="password">
          <Button type="primary">Update password</Button>
        </Modal.Open>

        <Modal.Window name="password">
          <GeneralUpdate type="password" onCloseModal />
        </Modal.Window>
      </Modal>

      <Modal>
        <Modal.Open opens="pin">
          <Button type="primary">Reset Pin</Button>
        </Modal.Open>

        <Modal.Window name="pin">
          <GeneralUpdate type="pin" onCloseModal />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default SettingsButtonTransaction;
