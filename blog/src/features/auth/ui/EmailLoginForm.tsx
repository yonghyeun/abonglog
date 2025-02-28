"use client";

import { useLoginAction } from "../lib";
import React from "react";

import { Form } from "@/shared/ui/Form";

export const EmailLoginForm = () => {
  const {
    formAction,
    isPending,
    getSubmitButtonClassName,
    getSubmitButtonMessage
  } = useLoginAction();

  return (
    <section className="flex flex-col gap-2 rounded-md p-4">
      <label htmlFor="abonglog-login-form">
        <h1 aria-labelledby="abonglog-login-form" className="text-center">
          abonglog Login
        </h1>
      </label>
      <Form
        id="abonglog-login-form"
        className="flex flex-col gap-4"
        action={formAction}
      >
        <Form.Container>
          <Form.Label htmlFor="email" className="font-semibold">
            이메일
          </Form.Label>
          <Form.Input type="email" id="email" name="email" required />
        </Form.Container>
        <Form.Container className="flex items-center gap-2">
          <Form.Label htmlFor="password" className="font-semibold">
            비밀번호
          </Form.Label>
          <Form.Input type="password" id="password" name="password" required />
        </Form.Container>
        <Form.SubmitButton
          disabled={isPending}
          className={getSubmitButtonClassName()}
        >
          {getSubmitButtonMessage()}
        </Form.SubmitButton>
      </Form>
    </section>
  );
};
