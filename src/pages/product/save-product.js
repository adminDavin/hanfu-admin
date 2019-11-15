import React, { Component } from 'react';
import { connect } from 'dva';
import { Descriptions, Row, Col, Form, Button, Cascader, Input } from 'antd';


class ProductInstance {
  constructor() {
    this.categoryId = 0;
    this.hfName = '';
    this.brandId = 0;
    this.productDesc = '';
    this.bossId = 0;
    this.hfSpec = [];
    this.hfInfo = [];
  }
}

@connect(({ product }) => ({
  products: product,
}))
class SaveProduct extends Component {

  categories = [];

  productInstance = new ProductInstance();

  columns = [{
    key: '1',
    title: 'aa',
    dataIndex: 'key',
  }];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/listCategory',
      payload: {},
    });
    setTimeout(() => {
      this.props.products.categories.forEach(
        element => {
          const option = {
            label: element.hfName,
            value: element.id,
          };
          if (typeof (element.childCategories) === 'string') {
            option.children = [];
            element.childCategories.split(',').forEach(item => {
                const items = item.split(':');
                option.children.push({ value: Number(items[1]), label: items[0] });
              }
            );
          }
          this.categories.push(option);
        });
    }, 1000);
  }

  handleSubmit = e => {
    console.log(e.preventDefault());
    // this.productInstance.categoryId = e;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Descriptions title="商品描述" bordered center>
          <Descriptions.Item label="商品类目">{this.productInstance.categoryId}</Descriptions.Item>
          <Descriptions.Item label="商品名称">sss</Descriptions.Item>
          <Descriptions.Item label="所属品牌">YES</Descriptions.Item>
          <Descriptions.Item label="商品描述">2018-04-24 18:00:00</Descriptions.Item>
          <Descriptions.Item label="所属商家">2018-04-24 18:00:00</Descriptions.Item>
        </Descriptions>
        <Row>
          <Col span={8}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="商品类目">
                <Cascader options={this.categories} onChange={this.handleSubmit} placeholder="Please select" id="categoryId"/>,
              </Form.Item>
              <Form.Item label="商品名称">
                {getFieldDecorator('productName', { rules: [{ required: true, message: '请输入商品名称', whitespace: true }] })(<Input />)}
              </Form.Item>
              <Form.Item label="所属品牌">
git p              </Form.Item>
              <Form.Item label="商品描述">
                {getFieldDecorator('productDesc', { rules: [{ required: true, message: '录入商品描述', whitespace: true }] })(<Input />)}
              </Form.Item>
              <Form.Item label="所属商家">
                <Input placeholder="商家" id="bossId" defaultValue={0} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                保存商品信息
              </Button>
            </Form>
          </Col>
          <Col span={7} offset={1} >
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="商品属性名称">
                <Input placeholder="商品属性描述" id="productInfoName" />
              </Form.Item>
              <Form.Item label="商品属性描述">
                <Input placeholder="商品属性描述" id="productInfoDesc" />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                添加商品属性
              </Button>
            </Form>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item label="规格名称">
              <Input placeholder="规格名称" id="productSpecName" />
            </Form.Item>
            <Form.Item label="规格类型">
              <Input placeholder="规格类型" id="productSpecType" />
            </Form.Item>
            <Form.Item label="规格单位">
              <Input placeholder="规格单位" id="productSpecUnit" />
            </Form.Item>
            <Form.Item label="规格默认值">
              <Input placeholder="规格默认值" id="productSpecValue" defaultValue={this.productInstance.hfName}/>
            </Form.Item>
            <Form onSubmit={this.handleSubmit}>
              <Button type="primary" htmlType="submit">
                添加商品规格
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create({ name: 'saveProduct' })(SaveProduct);
