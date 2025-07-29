export declare const HeaderContainer: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, never>> & string;
export declare const LogoLink: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react-router").LinkProps & import("react").RefAttributes<HTMLAnchorElement>, never>> & string & Omit<import("react").ForwardRefExoticComponent<import("react-router").LinkProps & import("react").RefAttributes<HTMLAnchorElement>>, keyof import("react").Component<any, {}, any>>;
export declare const CustomMenu: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<Omit<import("antd").MenuProps & import("react").RefAttributes<import("antd").MenuRef>, "items"> & {
    items?: import("antd/es/menu/interface").ItemType<import("antd/es/menu/interface").MenuItemType>[] | undefined;
}, never>> & string & Omit<Omit<import("react").ForwardRefExoticComponent<Omit<import("antd").MenuProps & import("react").RefAttributes<import("antd").MenuRef>, "items"> & {
    items?: import("antd/es/menu/interface").ItemType[] | undefined;
}> & {
    Item: Omit<import("react").FunctionComponent<import("antd").MenuItemProps>, ""> & (<T extends import("antd").MenuItemProps>(props: T extends infer U extends import("antd").MenuItemProps ? unknown extends U ? import("antd").MenuItemProps : U : import("antd").MenuItemProps) => ReturnType<import("react").FunctionComponent<import("antd").MenuItemProps>>);
    SubMenu: import("react").FC<import("antd").SubMenuProps>;
    Divider: import("react").FC<import("antd/es/menu").MenuDividerProps>;
    ItemGroup: import("react").ForwardRefExoticComponent<Omit<import("rc-menu").MenuItemGroupProps, "ref"> & import("react").RefAttributes<HTMLLIElement>>;
}, ""> & (<T extends import("antd/es/menu/interface").MenuItemType>(props: Omit<import("antd").MenuProps & import("react").RefAttributes<import("antd").MenuRef>, "items"> & {
    items?: (T extends infer U extends import("antd/es/menu/interface").MenuItemType ? unknown extends U ? import("antd/es/menu/interface").ItemType : import("antd/es/menu/interface").ItemType<U> : import("antd/es/menu/interface").ItemType)[] | undefined;
}) => ReturnType<import("react").ForwardRefExoticComponent<Omit<import("antd").MenuProps & import("react").RefAttributes<import("antd").MenuRef>, "items"> & {
    items?: import("antd/es/menu/interface").ItemType[] | undefined;
}> & {
    Item: Omit<import("react").FunctionComponent<import("antd").MenuItemProps>, ""> & (<T_1 extends import("antd").MenuItemProps>(props: T_1 extends infer U_1 extends import("antd").MenuItemProps ? unknown extends U_1 ? import("antd").MenuItemProps : U_1 : import("antd").MenuItemProps) => ReturnType<import("react").FunctionComponent<import("antd").MenuItemProps>>);
    SubMenu: import("react").FC<import("antd").SubMenuProps>;
    Divider: import("react").FC<import("antd/es/menu").MenuDividerProps>;
    ItemGroup: import("react").ForwardRefExoticComponent<Omit<import("rc-menu").MenuItemGroupProps, "ref"> & import("react").RefAttributes<HTMLLIElement>>;
}>), keyof import("react").Component<any, {}, any>>;
