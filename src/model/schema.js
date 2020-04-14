import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const Schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "player",
      columns: [{ name: "audio_url", type: "string" }],
    }),
  ],
});
