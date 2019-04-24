import React, { useEffect } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { Form, Button, Divider, Row, Col, Radio, Popconfirm } from 'antd';

import { updateDocument } from '../config/graphql/mutations';
import getFormType from '../utils/get-form-type';
import styles from '../styles/upload-form.module.css';
import schema from '../config/schema/schema';

const validFile = file => {
  return file && file.file && file.file.status === 'done';
};

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } },
};

const componentDidMount = (form, values) => {
  Object.keys(form.getFieldsValue()).forEach(key => {
    form.setFieldsValue({ [key]: values[key] });
  });
};

const handleSubmit = (e, form, initialValues) => {
  e.preventDefault();
  form.validateFields((err, values) => {
    if (!err) {
      Auth.currentAuthenticatedUser().then(user => {
        const variables = {
          ...initialValues,
          ...values,
          file: values.file.file.response.key,
          updatedAt: Math.floor(Date.now() / 1000),
          updatedBy: user.attributes.email,
        };
        API.graphql(graphqlOperation(updateDocument, variables))
          .then(() => window.location.assign('/admin'))
          .catch(() => {});
      });
    }
  });
};

const handleDelete = (form, initialValues) => {
  form.validateFields((err, values) => {
    if (!err) {
      Auth.currentAuthenticatedUser().then(user => {
        const variables = {
          ...initialValues,
          ...values,
          file: values.file.file.response.key,
          updatedAt: Math.floor(Date.now() / 1000),
          updatedBy: user.attributes.email,
        };
        API.graphql(graphqlOperation(updateDocument, variables))
          .then(() => window.location.assign('/admin'))
          .catch(() => {});
      });
    }
  });
};

const UploadForm = ({ form, values, defaultFileList }) => {
  useEffect(() => componentDidMount(form, values), [values]);
  return (
    <Form layout="horizontal" onSubmit={e => handleSubmit(e, form, values)}>
      {Object.entries(schema).map(([key, value]) =>
        getFormType({ ...value, value: key }, form, defaultFileList),
      )}
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 12, offset: 6 }}>
          <Divider>Admin Controls</Divider>
        </Col>
      </Row>
      <Form.Item
        label="Status"
        className={styles.submitContainerLayout}
        {...formItemLayout}
      >
        {form.getFieldDecorator('status')(
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="DRAFT">Draft</Radio.Button>
            <Radio.Button value="PUBLISHED">Published</Radio.Button>
            <Radio.Button value="DELETED">Deleted</Radio.Button>
          </Radio.Group>,
        )}
      </Form.Item>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 12, offset: 6 }}>
          <Divider />
        </Col>
      </Row>
      {form.getFieldValue('status') === 'DELETED' ? (
        <Form.Item className={styles.submitContainerLayout}>
          <Popconfirm
            title="Are you sure you want to delete this document?"
            onConfirm={() => handleDelete(form, values)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="danger"
              htmlType="button"
              disabled={!validFile(form.getFieldValue('file'))}
            >
              Delete
            </Button>
          </Popconfirm>
        </Form.Item>
      ) : (
        <Form.Item className={styles.submitContainerLayout}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!validFile(form.getFieldValue('file'))}
          >
            Update
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};
const WrappedUploadForm = Form.create()(UploadForm);

export default WrappedUploadForm;
