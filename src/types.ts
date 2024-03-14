export type TaskType = {
  archived: boolean;
  icon:
    | {
        emoji: 'string';
        type: 'emoji';
      }
    | {
        external: {
          url: string;
        };
        type: 'external';
      }
    | {
        file: {
          url: string;
        };
        type: 'file';
      };
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
    Date?: {
      id: string;
      type: 'date';
      date: {
        end: string;
        start: string;
      };
    };
    Urgency: {
      select: {
        color: string;
        id: string;
        name: 'Не срочно' | 'Срочно';
      } | null;
      type: 'select';
    };
    Importance: {
      select: {
        color: string;
        id: string;
        name: 'Важно' | 'Не важно';
      } | null;
      type: 'select';
    };
    Done: { checkbox: boolean; id: string; type: 'checkbox' };
  };
};
export type BlockType =
  | {
      blockId: string;
      children: { blockId: string; parent: string; type: 'table_row' }[];
      parent: string;
      type: 'table';
    }
  | {
      blockId: string;
      children: BlockType[];
      parent: string;
      type: 'column_list';
    }
  | {
      blockId: string;
      children: BlockType[];
      parent: string;
      type: 'column';
    }
  | {
      blockId: string;
      children: [];
      parent: string;
      type: 'divider';
    }
  | {
      blockId: string;
      children: [];
      parent: string;
      type: 'to_do' | 'quote' | 'callout';
    }
  | {
      blockId: string;
      children: BlockType[];
      parent: string;
      type:
        | 'heading_1'
        | 'heading_2'
        | 'heading_3'
        | 'bulleted_list_item'
        | 'numbered_list_item'
        | 'paragraph'
        | 'toggle';
    };
