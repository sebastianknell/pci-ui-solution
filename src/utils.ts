export const objectArrayToTsv = (array: any[]) => {
    const replacer = (key: string, value: any) => (value === null ? "" : value); // specify how you want to handle null values here
    const header = Object.keys(array[0]);
    const tsv = [
        ...array.map((row) =>
            header
                .map((fieldName) => JSON.stringify(row[fieldName], replacer))
                .join("\t")
        ),
    ].join("\r\n");
    return tsv;
}

export const numberComparator = (str1: string, str2: string) => {
    if (str1 === undefined) return -1;
    if (str2 === undefined) return 1;
    return Number(str1) - Number(str2);
};

export const dateComparator = (dateStr1: string, dateStr2: string) => {
    const time1 = new Date(dateStr1).getTime();
    const time2 = new Date(dateStr2).getTime();

    if (time1 === time2) return 0;
    return time1 > time2 ? 1 : -1;
};