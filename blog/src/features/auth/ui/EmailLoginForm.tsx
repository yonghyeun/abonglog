"use client";

import { useLoginAction } from "../model";
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
    <section className="flex flex-col gap-2 p-4 text-primary">
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
          <Form.Label htmlFor="email" className="w-20 text-sm">
            이메일
          </Form.Label>
          <Form.Input
            type="email"
            id="email"
            name="email"
            required
            placeholder="이메일을 입력해주세요"
          />
        </Form.Container>
        <Form.Container className="flex items-center gap-2">
          <Form.Label htmlFor="password" className="w-20 text-sm">
            비밀번호
          </Form.Label>
          <Form.Input
            type="password"
            id="password"
            name="password"
            required
            placeholder="비밀번호를 입력해주세요"
          />
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
