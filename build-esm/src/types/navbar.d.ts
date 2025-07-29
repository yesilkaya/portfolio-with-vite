export type NavbarItem = {
    key: string;
    label: string;
    type: "route" | "anchor";
    route?: string;
    id?: string;
};
