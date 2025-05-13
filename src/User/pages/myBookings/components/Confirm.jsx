import { Modal } from "antd";
import { ExclamationCircleFilled, CheckCircleFilled } from "@ant-design/icons";
import { toast } from "react-hot-toast";

const { confirm } = Modal;

export const ConfirmModal = {
  staticConfirm: ({
    title = "Confirm",
    description= "",
    action, // Your local action function
    successText = "Success!",
    errorText = "Failed!",
    okText = "OK",
    cancelText = "Cancel",
  }) => {
    confirm({
      title,
      className:'bg-slate-50 rounded-lg overflow-hidden',
      content:description,
      rootClassName:'text-white',
      okText,
      cancelText,
      centered: true,
      async onOk() {
        try {
          if (action) {
            await action(); // Execute passed action
          }
          toast.success(successText);
        } catch (error) {
          toast.error(error?.message || errorText);
        } finally {
          Modal.destroyAll(); // Close modal in all cases
        }
      },
      onCancel() {
        toast("Cancelled", { icon: "⚠️" });
      },
    });
  },
};

// Usage examples:
// ConfirmModal.confirmAction({ action: yourFunction, title: "Approve" });
// ConfirmModal.checkOutAction({ action: yourFunction });
// ConfirmModal.show({ action: yourFunction, title: "Delete", description: "This cannot be undone" });
