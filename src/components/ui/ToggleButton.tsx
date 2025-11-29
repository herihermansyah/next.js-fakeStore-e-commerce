import React from "react";
import {Button} from "./button";

interface ToggleButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  click: boolean;
  iconOn: React.ReactNode;
  iconOf: React.ReactNode;
}

function ToggleButton({onClick, click, iconOn, iconOf}: ToggleButtonProps) {
  return (
    // Reusable button with visual feedback and toggle behavior
    <Button
      className="text-white hover:text-white hover:bg-hover2 active:scale-[0.9]"
      variant={"ghost"}
      onClick={onClick}
    >
      {/* Render icon based on toggle state */}
      {click ? iconOf : iconOn}
    </Button>
  );
}

export default ToggleButton;
