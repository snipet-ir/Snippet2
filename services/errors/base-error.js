class BaseError extends Error {
	constructor({ message, status }) {
		super();
		this.message = message;
		this.status = status;
	}

	toJSON() {
		return {
			error: this.message,
			status: this.status,
		};
	}

	stringify() {
		return `Error: ${this.message}
        status: ${this.status}`;
	}
}

module.exports = BaseError;
