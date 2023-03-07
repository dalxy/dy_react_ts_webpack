import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export function Redirect({
    to,
    replace,
}: // state,
{
    to: string;
    replace: boolean;
    // state: object;
}): null {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(to, {
            replace,
            // state,
        });
    });

    return null;
}
