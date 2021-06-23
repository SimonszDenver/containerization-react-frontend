import { Button, Modal, notification, Row, Spin } from 'antd';
import { SmileTwoTone, FrownTwoTone, LoadingOutlined, WarningTwoTone } from '@ant-design/icons';

export const notifyError = (title, key = undefined) => {
  notification.error({
    message: title,
    icon: <FrownTwoTone twoToneColor="#f94a4d" />,
    key: key
  });
};

export const notifyWarning = (message, duration = undefined) => {
  notification.warning({
    message: message,
    icon: <FrownTwoTone twoToneColor="#F6C627" />,
    duration: duration
  });
}

export const notifySuccess = (title, key = undefined) => {
  notification.success({
    message: title,
    icon: <SmileTwoTone twoToneColor="#52c41a" />,
    key: key
  });
};

export const notifyInProgress = (title, key = undefined, duration = 0) => {
  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  notification.open({
    message: title,
    icon: <Spin indicator={loadingIcon} />,
    key: key,
    duration: duration
  });
};

export const notifiableAPICall = async (fn, key, inProgressMessage, successMessage, errorMessage, errorThrowable = false) => {
  try {
    notifyInProgress(inProgressMessage, key);
    const res = await fn();
    notification.close(key);
    if (successMessage) notifySuccess(successMessage, key);
    return res;
  } catch (e) {
    console.error(e);
    notification.close(key)
    notifyError(errorMessage instanceof Function ? errorMessage(e) : errorMessage, key);
    if (errorThrowable) throw e;
  }
}

export const notifyConfirmation = (message, actionButtonText, onActionClick, cancelButtonText = "Cancel", onCancelClick, key = 'default_key', duration = 0) => {
  const onAction = () => {
    onActionClick();
    notification.close(key);
  }

  const onCancel = () => {
    if (onCancelClick) onCancelClick();
    notification.close(key);
  }

  const content = <div>
    <p>{message}</p>
    <Row className='intnnt-ntfcn-btn-rw'>
      <Button type='link' onClick={() => onCancel()} className='intnnt-btn intnnt-btn-cncl'>{cancelButtonText}</Button>
      <Button type='link' onClick={() => onAction()} className='intnnt-btn intnnt-btn-dngr'>{actionButtonText}</Button>
    </Row>
  </div>
  notification.open({
    message: "Warning",
    description: content,
    icon: <WarningTwoTone twoToneColor='#f5222d' />,
    key: key,
    duration: duration
  });
}


export const confirm = (title, content, onOk, onCancel) => {
  Modal.confirm({
    className: 'intenant-confirm',
    width: 520,
    title: (<p className='admin-modal-title'>{title}</p>),
    icon: null,
    content: (<p className='admin-modal-text'>{content}</p>),
    okText: 'Confirm',
    okType: 'primary',
    okButtonProps: { className: "ant-btn btn btn--primary" },
    cancelText: 'Cancel',
    cancelButtonProps: { className: "ant-btn btn btn-bordered" },
    onOk: onOk,
    onCancel: onCancel
  });
}