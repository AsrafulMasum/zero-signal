    
    export interface ClientData {
        key: string;
        partnerId: string;
        partnerName: string;
        partnerEmail: string;
        partnerNumber: string;
        joinDate: string;
        status: 'Active' | 'Pending' | 'Suspend';
        hasBlueTag?: boolean;
    }
    export const clientData: ClientData[] = [
        {
            key: '1',
            partnerId: 'BP001',
            partnerName: 'John Smith',
            partnerEmail: 'john@email.com',
            partnerNumber: '+01 555 33 566 23',
            joinDate: '01-March-2025',
            status: 'Active',
        },
        {
            key: '2',
            partnerId: 'BP002',
            partnerName: 'Sarah Lee',
            partnerEmail: 'sarah@email.com',
            partnerNumber: '+01 555 33 566 23',
            joinDate: '15-June-2025',
            status: 'Pending',
            hasBlueTag: true,
        },
        {
            key: '3',
            partnerId: 'BP003',
            partnerName: 'David Chen',
            partnerEmail: 'david@email.com',
            partnerNumber: '+01 555 33 566 23',
            joinDate: '22-Sep-2025',
            status: 'Suspend',
            hasBlueTag: true,
        },
    ];