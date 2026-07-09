import type { I18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { z } from "zod";

export const createLoginSchema = (translate: I18n["_"]) =>
  z.object({
    email: z.email(translate(msg`Email không hợp lệ`)),
    password: z
      .string()
      .min(1, translate(msg`Vui lòng nhập mật khẩu`))
      .min(6, translate(msg`Mật khẩu phải có ít nhất 6 ký tự`)),
  });

export const createRegisterSchema = (translate: I18n["_"]) =>
  z
    .object({
      email: z.email(translate(msg`Email không hợp lệ`)),
      password: z
        .string()
        .min(1, translate(msg`Vui lòng nhập mật khẩu`))
        .min(6, translate(msg`Mật khẩu phải có ít nhất 6 ký tự`)),
      confirmPassword: z
        .string()
        .min(1, translate(msg`Vui lòng nhập lại mật khẩu`)),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: translate(msg`Mật khẩu nhập lại không khớp`),
      path: ["confirmPassword"],
    });

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
export type RegisterFormValues = z.infer<
  ReturnType<typeof createRegisterSchema>
>;
