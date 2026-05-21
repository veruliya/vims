<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class CreateReceivedReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'storeItems' => ['required', 'array', 'list', 'min:1'],
            'storeItems.*.id' => ['required', 'integer', 'exists:store_items,id'],
            'storeItems.*.received_quantity' => ['required', 'numeric', 'not_in:0'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'storeItems.required' => 'Select at least one item.',
            'storeItems.array' => 'The selected items payload is invalid.',
            'storeItems.list' => 'The selected items payload is invalid.',
            'storeItems.min' => 'Select at least one item.',
            'storeItems.*.id.required' => 'Each selected item must have an ID.',
            'storeItems.*.id.integer' => 'Each selected item ID must be an integer.',
            'storeItems.*.id.exists' => 'One or more selected items are invalid.',
            'storeItems.*.received_quantity.required' => 'Each selected item must have a received quantity.',
            'storeItems.*.received_quantity.numeric' => 'Each received quantity must be a number.',
            'storeItems.*.received_quantity.not_in' => 'Received quantity cannot be 0.',
        ];
    }
}
