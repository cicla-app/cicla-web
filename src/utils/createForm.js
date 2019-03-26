import createDOMForm from 'rc-form/lib/createDOMForm';

const customCreateForm = () =>
  createDOMForm({
    validateMessages: {
      required(field) {
        return 'Required field';
      }
    }
  });

export { customCreateForm as createForm };