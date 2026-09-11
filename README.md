# IRIS — Intelligent Email Threat Detection & Investigation System

IRIS is a full-stack email security and threat investigation platform designed to help users detect, analyze, and investigate suspicious emails.

The platform provides a security-focused dashboard for monitoring email threats, reviewing alerts, investigating suspicious messages, and analyzing potential phishing and malicious activity.

---

## 🚀 Features

### Security Dashboard
- Real-time-style security overview
- Critical threat alerts
- Recent email activity
- Threat statistics and monitoring
- Security-focused visualizations

### Email Security
- Email inbox and message inspection
- Suspicious email detection
- Phishing threat identification
- Threat severity classification
- Detailed email analysis

### Threat Investigation
- Case investigation workflow
- Alert management
- Suspicious email investigation
- Threat indicators and analysis
- Investigation-focused interface

### Reports & Settings
- Security reports
- Investigation data
- Application settings
- Theme and interface customization

---

## 🏗️ Project Structure

```text
IRIS/
│
├── frontend/                  # React + TypeScript frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── data/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.ts
│   └── ...
│
├── services/                  # Backend security analysis services
│   ├── attachment_analysis.py
│   ├── body_analysis.py
│   ├── dns_analysis.py
│   └── ...
│
├── main.py                    # Backend entry point
├── .gitignore
└── README.md
