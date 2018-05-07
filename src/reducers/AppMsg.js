import { ADD_PRODUCTS_TO_APP_CART } from "../actions/app_cart";
import { CLOSE_APP_MSG_DONE, OPEN_APP_MSG, EXPECT_OPEN_APP_MSG, OPEN_APP_MSG_DONE } from "../actions/app_msg";

export default function AppMsg(state={
    open: false,
    content: "",
    actionText: "",
    href: "",
}, action){
    switch (action.type) {
        case ADD_PRODUCTS_TO_APP_CART:
            return {
                open: true,
                content: "加入购物车成功！",
                actionText: "立刻查看",
                href: '#/cart'
            }
        case CLOSE_APP_MSG_DONE:
            return Object.assign({}, state, {
                open: false
            });
        
        case EXPECT_OPEN_APP_MSG:
            
            return Object.assign({}, state, {
                ...action.msgParams
            });
        case OPEN_APP_MSG_DONE:
            return Object.assign({}, state, {
                open: true,
            });
                
        default:
            return state;
    }
}