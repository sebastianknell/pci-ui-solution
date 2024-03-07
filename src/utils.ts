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