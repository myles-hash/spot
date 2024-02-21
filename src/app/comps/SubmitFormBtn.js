"use client";
import { useFormStatus } from "react-dom";

export default function SubmitFormBtn() {
    const formStatus = useFormStatus();

    return (
        <button type="submit" disabled={formStatus.pending}>
            {formStatus.pending ? "Submitting Form...": "Submit Form"}
        </button>
    );
}