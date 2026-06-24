"use client";

import { Component, type ReactNode } from "react";

interface Props   { children: ReactNode; fallback?: ReactNode; }
interface State   { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium text-neutral-700">Something went wrong.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 text-sm text-neutral-500 underline"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
