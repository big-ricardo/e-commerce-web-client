import React from "react";
import { vi } from "vitest";

vi.mock("antd", async () => {
  const antd = await vi.importActual("antd");

  const Select = (props: any) => {
    const [text, setText] = React.useState("");
    const multiple = ["multiple", "tags"].includes(props.mode);

    const handleOnChange = (e: any) =>
      props.onChange(
        multiple
          ? Array.from(e.target.selectedOptions).map(
              (option: any) => option.value,
            )
          : e.target.value,
      );

    const handleKeyDown = (e: any) => {
      if (e.key === "Enter") {
        props.onChange([text]);
        setText("");
      }
    };

    return (
      <>
        <select
          className={props.className}
          data-testid={props["data-testid"]}
          data-value={props.value || undefined}
          defaultValue={props.defaultValue || undefined}
          disabled={props.disabled || undefined}
          id={props.id || undefined}
          multiple={multiple || undefined}
          onChange={handleOnChange}
          value={props.value || undefined}
        >
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        {props.mode === "tags" && (
          <input
            data-testid={`${props["data-testid"]}Input`}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            value={text}
          />
        )}
      </>
    );
  };

  Select.Option = ({ children, ...otherProps }: any) => (
    <option {...otherProps}>{children}</option>
  );
  Select.OptGroup = ({ children, ...otherProps }: any) => (
    <optgroup {...otherProps}>{children}</optgroup>
  );

  const Input = (props: any) => {
    const [text, setText] = React.useState("");

    const handleOnChange = (e: any) => {
      setText(e.target.value);
      props.onChange(e.target.value);
    };

    console.log("props", props);

    return (
      <input
        data-testid={props["data-testid"]}
        onChange={handleOnChange}
        type={props.type}
        value={text}
      />
    );
  };

  return { ...antd, Select };
});
