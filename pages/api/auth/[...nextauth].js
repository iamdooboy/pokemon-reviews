import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../lib/prisma'
import nodemailer from 'nodemailer'
import Handlebars from 'handlebars'
import { readFileSync } from 'fs'
import path from 'path'

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_SERVER_HOST,
	port: process.env.EMAIL_SERVER_PORT,
	auth: {
		user: process.env.EMAIL_SERVER_USER,
		pass: process.env.EMAIL_SERVER_PASSWORD
	},
	secure: true
})

const emailsDir = path.resolve(process.cwd(), 'emails')

const sendVerificationRequest = ({ identifier, url }) => {
	const emailFile = readFileSync(path.join(emailsDir, 'confirm-email.html'), {
		encoding: 'utf8'
	})
	const emailTemplate = Handlebars.compile(emailFile)
	transporter.sendMail({
		from: `"⭐️ Pokemon Reviews" ${process.env.EMAIL_FROM}`,
		to: identifier,
		subject: 'Your sign-in link for Pokemon Reviews',
		html: emailTemplate({
			base_url: process.env.NEXTAUTH_URL,
			signin_url: url,
			email: identifier
		})
	})
}

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		}),
		EmailProvider({
			maxAge: 10 * 60,
			sendVerificationRequest
		})
	],
	pages: {
		signIn: '/',
		signOut: '/',
		error: '/',
		verifyRequest: '/',
		newUser: '/hello'
	},
	secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
