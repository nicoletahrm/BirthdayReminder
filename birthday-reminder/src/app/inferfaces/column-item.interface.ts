import { NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";
import { Friend } from "./friend.interface";

export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn<Friend> | null;
    sortDirections: NzTableSortOrder[];
}