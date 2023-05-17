import { ColumnItem } from 'src/app/inferfaces/column-item.interface';
import { Friend } from 'src/app/inferfaces/friend.interface';

export let listOfColumns: ColumnItem[] = [
    {
        name: 'First name',
        sortOrder: null,
        sortFn: (a: Friend, b: Friend) => a.first_name.localeCompare(b.first_name),
        sortDirections: ['ascend', 'descend', null]
    },
    {
        name: 'Last name',
        sortOrder: null,
        sortFn: (a: Friend, b: Friend) => a.last_name.localeCompare(b.last_name),
        sortDirections: ['ascend', 'descend', null]
    },
    {
        name: 'Phone number',
        sortOrder: null,
        sortFn: null,
        sortDirections: [null]
    },
    {
        name: 'City',
        sortOrder: null,
        sortFn: (a: Friend, b: Friend) => a.city.localeCompare(b.city),
        sortDirections: ['ascend', 'descend', null]
    },
    {
        name: 'Birth date',
        sortOrder: null,
        sortFn: (a: Friend, b: Friend) =>  a.birthday_date.localeCompare(b.birthday_date),
        sortDirections: ['ascend', 'descend', null]
    }
];