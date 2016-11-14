import React, { Component} from 'react';
import { Field, reduxForm } from 'redux-form';

class New extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { cates, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>标题</label>
                    <Field type="text" component="input" className="form-control" name="title" />
                </div>
                <div className="form-group">
                    <label>分类</label>
                    <Field component="select" className="form-control" name="category">
                        <option></option>
                        {cates && cates.map((cate, i) =>
                            <option key={i} value={`${cate.name},${cate.url}`}>{cate.name}</option>
                        )}
                    </Field>
                </div>
                <div className="form-group">
                    <label>标签</label>
                    <Field type="text" component="input" className="form-control" name="tags" placeholder="多个标签使用英文逗号隔开" />
                </div>
                <div className="form-group">
                    <label>正文</label>
                    <Field component="textarea" className="form-control" name="content" />
                </div>
                <button type="submit" className="btn btn-success">提交</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'new'
})(New);

