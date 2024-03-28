export type ColorNamesTypes =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red';
export type TaskTextType = {
  annotations: {
    bold: boolean;
    code: boolean;
    color: ColorNamesTypes;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
  };
  href: null | string;
  plain_text: string | null;
  text: { content: string; link: null | string };
  type: 'text';
};
export type TitlePropertyType = {
  id: 'title';
  title: TaskTextType[];
  type: 'title';
};
type TextPropertyType = {
  id: string;
  rich_text: TaskTextType[];
  type: 'rich_text';
};
type NumberPropertyType = { id: string; number: number; type: 'number' };
type SelectPropertyType = {
  id: string;
  select: {
    color: ColorNamesTypes;
    id: string;
    name: string;
  };
  type: 'select';
};
type MultiSelectPropertyType = {
  id: string;
  multi_select: { color: ColorNamesTypes; id: string; name: string }[];
  type: 'multi_select';
};
type StatusPropertyType = {
  id: string;
  status: { color: ColorNamesTypes; id: string; name: string };
  type: 'status';
};
type DatePropertyType = {
  date: {
    end?: string;
    start: string;
    time_zone: null;
  };
  id: string;
  type: 'date';
};
type FilesPropertyType = {
  id: string;
  files: { file: { expiry_time: string; url: string }; name: string; type: 'file' }[];
  type: 'files';
};
type CheckboxPropertyType = { checkbox: boolean; id: string; type: 'checkbox' };
type UrlPropertyType = { id: string; type: 'url'; url: string };
type EmailPropertyType = { email: string; id: string; type: 'email' };
type PhonePropertyType = { id: string; phone_number: string; type: 'phone_number' };
type CreatedTimePropertyType = {
  created_time: string;
  description: string;
  id: string;
  name: string;
  type: 'created_time';
};
type LastEditedTimePropertyType = {
  id: string;
  last_edited_time: string;
  type: 'last_edited_time';
};
type IdPropertyType = {
  id: string;
  type: 'unique_id';
  unique_id: { number: number; prefix: null };
};
export type TaskPropertyType =
  | IdPropertyType
  | TextPropertyType
  | TitlePropertyType
  | NumberPropertyType
  | DatePropertyType
  | SelectPropertyType
  | CheckboxPropertyType
  | UrlPropertyType
  | EmailPropertyType
  | PhonePropertyType
  | CreatedTimePropertyType
  | LastEditedTimePropertyType
  | FilesPropertyType
  | StatusPropertyType
  | MultiSelectPropertyType;
export type TaskType = {
  archived: boolean;
  'Sub-item': TaskType;
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
    [key: string]: TaskPropertyType;
  };
};
export type TaskContentBlockType =
  | {
      blockId: string;
      children: { blockId: string; parent: string; type: 'table_row' }[];
      parent: string;
      type: 'table';
    }
  | {
      blockId: string;
      children: TaskContentBlockType[];
      parent: string;
      type: 'column_list';
    }
  | {
      blockId: string;
      children: TaskContentBlockType[];
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
      children: TaskContentBlockType[];
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
