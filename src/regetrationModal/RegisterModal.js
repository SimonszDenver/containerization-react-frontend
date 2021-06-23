import React from 'react';
import { Card, Modal, Form, Input, Button } from 'antd';

const FormItem = Form.Item;

const RegisterModal = ({visible, registerModalToggle, addUser }) => {

    const [form] = Form.useForm();

    const register = async () => {
        try {
            let values = await form.validateFields();
            addUser(values);
        } catch (e) {
            console.error(e);
        }
    }
    
    return(
        <Modal
        visible={visible}
        footer={null}
        onCancel={registerModalToggle}
        closable={true}
        width={460}
        centered
        maskStyle={{backgroundColor:'rgba(0,0,0,0.8)'}}
        maskClosable={false}
        >
            <Card
            bordered={false}
            >
                <h2 className="new-building-contact-title">Register</h2>
                <Form
                layout='vertical'
                form={form}
                >
                    <FormItem
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please enter your first name' }]}
                    >
                        <Input placeholder='First Name'/>
                    </FormItem>
                    <FormItem
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please enter your last name' }]}
                    >
                        <Input placeholder='Last Name'/>
                    </FormItem>
                    <FormItem
                        label="NIC no."
                        name="nic"
                        rules={[{ required: true, message: 'Please enter your nic number' }]}
                    >
                        <Input placeholder='NIC'/>
                    </FormItem>
                    <FormItem
                        label="Phone Number"
                        name="mobileNumber"
                        rules={[{ required: true, message: 'Please enter your phone number' }]}
                    >
                        <Input placeholder='Phone Number'/>
                    </FormItem>
                    <FormItem
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please enter your address' }]}
                    >
                        <Input placeholder='Address'/>
                    </FormItem>
                    <FormItem>
                        <Button className="btn btn--primary new-user-manual-btn" onClick={register}>Register</Button>
                    </FormItem>
                </Form>
            </Card>
        </Modal>
    );
}

export default RegisterModal;

