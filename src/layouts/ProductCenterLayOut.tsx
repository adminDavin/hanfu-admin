/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
// import Link from 'umi/link';
import { Dispatch } from 'redux';
import { connect } from 'dva';
// import { formatMessage } from 'umi-plugin-react/locale';

// import Authorized from '@/utils/Authorized';
// import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
// import { isAntDesignPro } from '@/utils/utils';
import logo from '../assets/logo.svg';

export interface ProductCenterLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type ProductCenterLayoutContext = { [K in 'location']: ProductCenterLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

/**
 * use Authorized check all menu item
 */
// const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
//   menuList.map(item => {
//     const localItem = {
//       ...item,
//       children: item.children ? menuDataRender(item.children) : [],
//     };
//     return Authorized.check(item.authority, localItem, null) as MenuDataItem;
//   });

// const footerRender: ProductCenterLayoutProps['footerRender'] = (_, defaultDom) => {
//   if (!isAntDesignPro()) {
//     return defaultDom;
//   }
//   return (
//     <>
//       {defaultDom}
//       <div
//         style={{
//           padding: '0px 24px 24px',
//           textAlign: 'center',
//         }}
//       >
//         <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
//           <img
//             src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
//             width="82px"
//             alt="netlify logo"
//           />
//         </a>
//       </div>
//     </>
//   );
// };

const ProductCenterLayout: React.FC<ProductCenterLayoutProps> = props => {
  const { dispatch, children, settings } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);

  /**
   * init variables
   */
  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  return (
    <ProLayout logo={logo} onCollapse={handleMenuCollapse} {...props} {...settings}>
      {children}
    </ProLayout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(ProductCenterLayout);
