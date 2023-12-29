export interface IContact{
    id?: number;
    dsContato: string;
    nrCelular: string;
    dsEmail: string;
    stAtivo: number;
}

export interface IContactHeader{
    field: string;
    header: string;
}

export interface IOptionsContacts {
    name: string,
    code: boolean
}