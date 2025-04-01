export interface IPermissionStrategy {
    canEdit(): boolean;
    canView(): boolean;
}
