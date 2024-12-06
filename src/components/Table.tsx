// ... импорты

interface Props<T> {
    data: T[];
    loading: boolean;
    error: Error | null;
    columns: { key: keyof T; name: string }[];
    onEdit?: (item: T) => void;
    onDelete?: (id: number) => void; //Функция удаления
}

export default function DataTable<T extends { id: number }>({ data, loading, error, columns, onEdit, onDelete }: Props<T>) {
    // ... (остальной код аналогичен, но с использованием дженериков)

    return (
        <table>
            <thead>
                <tr>
                    {columns.map(col => <th key={col.key}>{col.name}</th>)}
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        {columns.map(col => <td key={col.key}>{item[col.key]}</td>)}
                        <td>
                            <button onClick={() => onEdit && onEdit(item)}>Изменить</button>
                            <button onClick={() => onDelete && onDelete(item.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
