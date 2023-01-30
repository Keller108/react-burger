import { SWITCH_TAB } from "../constants/tab";

export interface ITabSwitchAction {
    readonly type: typeof SWITCH_TAB;
    readonly payload: string;
}

export type TTabActions = ITabSwitchAction;

export const switchTab = (
    activeTab: string
): ITabSwitchAction => ({ type: SWITCH_TAB, payload: activeTab });