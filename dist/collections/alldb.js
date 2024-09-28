const alldb = {
    version: 0,
    primaryKey: "host",
    type: "object",
    properties: {
        host: {
            type: "string",
            maxLength: 100, // <- the primary key must have set maxLength
        },
        db: {},
    },
    required: ["host", "db"],
};
export default alldb;
