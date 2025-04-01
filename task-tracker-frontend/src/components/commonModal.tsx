/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";

interface CommonModalProps {
  button: React.ReactNode;
  body: React.ReactNode;
  title: string;
  actionTitle?: string;
  actionFunction?: () => void;
}
export default function CommonModal(props: CommonModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div
        role="button"
        style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}
        tabIndex={0}
        onClick={() => {
          onOpen();
        }}
      >
        {props.button}
      </div>

      <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{props.title}</ModalHeader>
              <ModalBody>{props.body}</ModalBody>
              {props.actionFunction && props.actionTitle && (
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={props.actionFunction}>
                    {props.actionTitle}
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
