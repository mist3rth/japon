import React, { Component, ErrorInfo, ReactNode } from "react";
import { log } from "../lib/logger";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  // Explicit props declaration to satisfy TS compiler target environment
  public props!: Props;

  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    log.error(`ErrorBoundary caught an error in section "${this.props.sectionName || "Unknown"}":`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-6 my-4 bg-neutral-900 border border-red-900/50 rounded-xl text-center">
          <h2 className="text-lg font-bold text-red-500 mb-2">Une erreur est survenue</h2>
          <p className="text-xs text-neutral-400 font-mono">
            Impossible de charger la section {this.props.sectionName || ""}.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
