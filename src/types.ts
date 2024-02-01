export type TaskType = {
  archived: boolean;
  created_by: {
    id: string;
    object: string;
  };
  created_time: string;
  id: string;
  last_edited_by: {
    id: string;
    object: string;
  };
  last_edited_time: Date;
  object: string;
  parent: {
    database_id: string;
    type: string;
  };
  properties: {
    Name: {
      id: string;
      title: {
        href: null | string;
        plain_text: string;
        text: {
          content: string;
          link: null | string;
        };
        annotations: {
          bold: boolean;
          code: boolean;
          color: string;
          italic: boolean;
          strikethrough: string;
          underline: boolean;
        };
      }[];
      type: 'title';
    };
    Checkbox: { checkbox: boolean; id: string; type: 'checkbox' };
    Date: {
      id: string;
      type: 'date';
      date: {
        end: string;
        start: string;
      };
    };
  };
};
