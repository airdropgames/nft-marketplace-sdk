export declare function HeaderAuth(token?: string): {
    headers: {
        'Content-Type': string;
        Authorization: string;
    };
};
export declare function HeaderFile(token?: string): {
    headers: {
        'Content-Type': string;
        Authorization: string;
        Accept: string;
        responseType: string;
    };
};
export declare function Header(): {
    headers: {
        'Content-Type': string;
    };
};
