import React from 'react';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import { setAppLayout } from '../../actions/app';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import QRCode from 'qrcode-react'
import { loadOneOrder } from '../../actions/orders' 


const styles = {
  card:{
    width:'92%',
    marginLeft:'4%',
    marginTop:4,
    borderRadius:8,
    padding:10,
    fontSize:13,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root:{
    width:'100%',
    marginTop:10,
  },
  shopName:{
    fontSize:12
  },
  orderStatus:{
    fontSize:12,
    textAlign:'right',
    color:'#ff5722'
  },
  productName:{
    fontSize:13,
  },
  price:{
    color:'#ff5722'

  },
  cardBottom:{
    textAlign:'right',
    fontSize:9,
  },
  finalPrice:{
    fontSize:15,
    color:'#ff5722'

  },
  button:{
    marginTop:12,
    marginLeft:12
  },
  orderButton:{
    marginBottom:10
  },
  cardTitle:{
    display:'flex',
    alignItems:'center',
    fontSize:12,
    marginBottom:10
  },
  qrcode:{
    textAlign:'center',
    paddingBottom:12
  }

};

class orderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    const { dispatch, layout,match} = this.props;
    console.log(`去哪了`)
    console.log('id'+match.params.id)
   
    if(layout.title!=='订单详情'){
      if(match.params.id){
        dispatch(loadOneOrder(match.params.id));
      }
        dispatch(setAppLayout(
            {
                isBack: true, 
                backTo: "/my/orders", 
                title: "订单详情", 
                hasCart: false, 
                hasBottomNav: false, 
                hasGeoLoc: false,
                hasEditor: false, 
                hasSearch: false,
            }
        ));
    }

  }

  render() { 
    console.log(`见鬼了`)
    const { classes } = this.props
    const { order } = this.props.order
    return (  
      <div className={ classes.root}>
        <Card className={ classes.card}> 
          <div className={classes.cardTitle}>
            <img alt="收货地址"  style={{height:17,marginRight:5}} src={require('../../components/imgs/address.svg')} />
            <div>收货地址</div>
          </div>
          {   <div>
                                            <div>姓名：{order.contact.name}</div>
                                            <div>电话：{order.contact.mobile}</div>
                                            <div>地址：{order.contact.address}</div>
                                         </div> 
          
          }
        </Card>
        <Card className={ classes.card}> 
          <div className={classes.cardTitle}>
            <Grid container spacing={24}>
              <Grid item xs={9} sm={9} style={{display:'flex'}}>
                <img alt="店铺图标"  style={{height:17,marginRight:5}}  src={require('../../components/imgs/shop.svg')}/>
                <div className={classes.shopName}>万人车汇自营店</div>
                <img alt="店铺图标" style={{height:17}} src={require('../../components/imgs/right.svg')}/>

              </Grid>
              <Grid item xs={3} sm={3} >
                <div className={classes.orderStatus} >待付款</div>
              </Grid>
            </Grid>
          </div>
          <div className={classes.cardContent}>
            {order.products!==undefined ? order.products.map((product,index)=> {
              return(
                <Grid container spacing={24} key={index}>
                  <Grid item xs={2} sm={2}>
                    <div className={classes.productImg}>
                      <img alt="店铺图标" style={{height:45,width:45}} src={'/imgs/webwxgetmsgimg.jpeg'}/>
                    </div>
                  </Grid>
                  <Grid item xs={8} sm={8}>
                    <div className={classes.productName}>{product.name_zh}</div>
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    <div className={classes.price}>￥{product.endPrice/100}</div>
                    <div className={classes.count}>x{order.productCounts[product._id]}</div>
                  </Grid>
                </Grid>
              )
            }) : null
            }
            
          </div>
          <div className={classes.cardBottom}>
            <div style={{marginTop:12}}>共计<span>{order.count}</span>件商品，合计：<span className={classes.finalPrice}>￥{order.totalAmount/100}</span>（含运费￥0.00）</div>

              <Grid container spacing={24}>
                <Grid item xs={12} sm={12}>
                  <div className={classes.orderButton}>
                  <Button variant="outlined"  size="small" className={classes.button}>
                    取消订单
                  </Button>
                  <Button variant="raised"  size="small" color="secondary" className={classes.button}>
                    付款
                  </Button>
                  </div>
                </Grid>
              </Grid>

          </div>
        </Card>
      
        <Card className={ classes.card}> 
          <div className={classes.cardTitle}>
            <img alt="二维码"   style={{height:17,marginRight:5}}  src={require('../../components/imgs/details.svg')} />
            <div>二维码</div>
          </div>
          <div className={classes.qrcode}><QRCode value={this.state.url} logo='/imgs/webwxgetmsgimg.jpeg'/></div>
        </Card>
        <Card className={ classes.card}> 
          <div className={classes.cardTitle}>
            <img alt="下单时间"   style={{height:17,marginRight:5}}  src={require('../../components/imgs/details.svg')} />
            <div>下单时间</div>
          </div>
          <div>订单编号：{order.orderCode}</div>
          <div>创建时间：2018-05-31 20:50:11</div>
        </Card>
      </div>
    )
  }
}
 


orderDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapToState(state){
  return {
    order: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(withStyles(styles)(orderDetails));